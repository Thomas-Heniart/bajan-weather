import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { join } from "path";
import * as process from "node:process";

@Controller("/")
export class AppController {
  @Get("/")
  homePage(@Res() res: Response) {
    res
      .setHeader("Cache-Control", "public, max-age=43200")
      .sendFile(publicResource("index.html"));
  }

  @Get("/login")
  loginPage(@Res() res: Response) {
    res
      .setHeader("Cache-Control", "public, max-age=43200")
      .sendFile(publicResource("login.html"));
  }

  @Get("/tiktok/oauth-success")
  tiktokOauthSuccess(@Res() res: Response) {
    res
      .setHeader("Cache-Control", "public, max-age=43200")
      .sendFile(publicResource("oauth_succeeded.html"));
  }

  @Get("/tiktok/oauth")
  async titkokOAuth(@Res() res: Response) {
    // eslint-disable-next-line @remotion/deterministic-randomness
    const csrfState = Math.random().toString(36).substring(2);
    res.cookie("csrfState", csrfState, { maxAge: 60000 });

    let url = "https://www.tiktok.com/v2/auth/authorize";

    const clientKey = process.env.TIKTOK_CLIENT_KEY ?? "";
    const redirectEndpoint = encodeURIComponent(
      process.env.OAUTH_SERVER_ENDPOINT_REDIRECT ?? "",
    );

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${clientKey}`;
    url += "&scope=user.info.basic";
    url += "&response_type=code";
    url += `&redirect_uri=${redirectEndpoint}`;
    url += "&state=" + csrfState;

    console.log("Redirecting to TikTok OAuth page: " + url);
    res.redirect(url);
  }
}

const publicResource = (...pathParts: string[]): string => {
  return join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "public",
    ...pathParts,
  );
};
