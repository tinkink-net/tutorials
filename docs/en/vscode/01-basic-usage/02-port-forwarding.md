# Port Forwarding in VSCode

VSCode provides a port forwarding feature that allows you to access the local or remote dev environment from the outside world. This feature is very useful for testing and debugging purposes.

## Background

We often develop in a local environment or a remote dev environment, which can not be accessed publicly. But under some circumstances, we need to access the local or remote dev environment from the outside world. For example, we need to integrate with a third-party service, or we need to test the web or service from a device that is not on the same network.

## How to Use

First, start your local dev environment, make sure the service is running. It will listen on a specific port, for example, `localhost:8080`.

Then, in VSCode, find the "Ports" feature in the bottom panel. You will see a button "Forward a Port". Click it, and enter the port number you want to forward. For example, `8080`.

![Port Forwarding](/attachments/vscode/port-forwarding/01.panel.png)

![Port Forwarding](/attachments/vscode/port-forwarding/02.input.png)

If this is the first time you use this feature, you will be prompted to sign in to your GitHub account and authorize the access.

![Port Forwarding](/attachments/vscode/port-forwarding/03.sign-in.png)

If you are using MacOS, you will also be prompted to authorize the access of keychain to VSCode. Just input your password and click "Allow".

![Port Forwarding](/attachments/vscode/port-forwarding/04.keychain.png)

Then wait for a few seconds, and you will see the port is forwarded successfully.

![Port Forwarding](/attachments/vscode/port-forwarding/05.success.png)

You can now access the local dev environment via the forwarded url. For example, if you forwarded port `8080`, you can access it via `https://xxx-1234.asse.devtunnels.ms` (the url may be different).

![Port Forwarding](/attachments/vscode/port-forwarding/06.authorize.png)

As you can see, when you access this forwarded url, it still needs to be authorized. Just click "Authorize". This satisfies our requirements in most cases, and ensures the security of our local dev environment.

But if you want the outside world to access your local dev environment without authorization, for example, an API endpoint or a webhook, you can find the record in VSCode "Ports" panel, and right-click it, then make it public.

> Please note: Exposing your local dev environment to the outside world may cause security risks. Please make sure you understand the risks before doing this.

Lastly, remember to close the port forwarding when you are done.

## Conclusion

In this article, we introduced the port forwarding feature in VSCode. This feature allows you to access your local or remote dev environment from the outside world. It is very useful for testing and debugging purposes. But please be careful when exposing your local dev environment to the outside world, as it may cause security risks.
