# Bajan Weather

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm start
```

**Render video**

```console
npm run build
```

**Upgrade Remotion**

```console
npm run upgrade
```

## Build

```shell
docker buildx build --platform=linux/amd64 -t gcr.io/daily-weather-435822/barbados-daily-weather:latest . --push

gcloud run jobs create barbados-daily-weather --image gcr.io/daily-weather-435822/barbados-daily-weather --region us-east1 --memory 2Gi

# This does not work yet
gcloud scheduler jobs create http barbados-daily-weather-scheduler \
  --schedule="0 6 * * *" \
  --time-zone="America/Barbados" \
  --location=us-east1 \
  --uri="https://us-east1-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/PROJECT_ID/jobs/barbados-daily-weather:run" \
  --http-method=POST \
  --oauth-service-account-email=daily-weather-435822@appspot.gserviceaccount.com
  
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).

## Useful resources

- https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

