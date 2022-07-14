# How to keep the ssh connection open (Broken pipe)

When you use ssh, you will often encounter a broken connection. Sometimes you just cut out of the window to do some other work, and when you return to the terminal window, you will find that the ssh connection has been broken. At this point, you can't do anything directly, but after a few seconds of waiting, the following message appears

```sh
Write failed: Broken pipe
```

This is a very unproductive situation.

## Reason

ssh uses long connections, so when there is data communication, the connection will be kept open, but without modifying the configuration, ssh will disconnect after a period of time without data communication, thus causing the above phenomenon to occur.

## Solution

Since the connection is disconnected because there is no data communication, is it possible to have ssh generate some communication at regular intervals during idle time? The answer is yes. And this is a problem for which both the server and client side of ssh provide solutions.

### Server-side settings

The server-side ssh service is called sshd, so its configuration file is `/etc/ssh/sshd_config`, and you only need to modify this file to.

```
ClientAliveInterval 60
ClientAliveCountMax 5
```

Where ``ClientAliveInterval`` indicates how often to send a "heartbeat" to the client, and ``ClientAliveCountMax`` indicates how many times to disconnect if no reply is received. So the above configuration means: send a heartbeat to the client every 60s, and disconnect when no reply is received 5 times.

Restart the sshd service after setting: `systemctl restart sshd.service` or `service sshd restart`.

### Client settings

The client configuration is located in `/etc/ssh/ssh_config`, which is a global configuration file. If setting up for the current user only, you can also modify `~/.ssh/ssh_config` to.

```
TCPKeepAlive yes
ServerAliveInterval 60
ServerAliveCountMax 5
```

The parameter meanings are almost the same as those set on the server side.

### Client-side temporary solution

In addition to modifying the configuration, the client can also use the following parameters to specify a timed "heartbeat" when initiating a connection

```sh
ssh -o ServerAliveInterval=60 root@xx.xx.xx.xx
```

## Summary

Once you set the "heartbeat", you will no longer be afraid that ssh will be disconnected for no reason.
