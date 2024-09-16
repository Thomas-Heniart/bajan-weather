variable "GCP_PROJECT_ID" {
  type = string
}

variable "DEPLOY_PAT" {
  type = string
}

provider "google" {
  credentials = file("./secrets/credentials.json")
  project     = var.GCP_PROJECT_ID
  region      = "us-east1"
}

resource "google_compute_instance" "default" {
  name         = "nodejs-vm"
  machine_type = "f1-micro"
  zone         = "us-east1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata_startup_script = <<-EOT
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y nodejs npm git

    # Install PM2 globally for managing Node.js processes
    npm install pm2 -g

    # Clone the repo using the GitHub PAT (Personal Access Token)
    export DEPLOY_PAT=${var.DEPLOY_PAT}
    git clone https://${var.DEPLOY_PAT}@github.com/Thomas-Heniart/bajan-weather.git || echo "Repo already cloned"

    # Install project dependencies
    cd bajan-weather && git pull
    npm install && npm run build

    # Restart the app using PM2
    pm2 restart all || pm2 start dist/src/main.js
    pm2 save
  EOT


  tags = ["http-server"]
}
