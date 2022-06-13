# Using the Private Registry

Elementary uses a private npm registry to license and distribute packages from the [Elementary Marketplace](https://www.elementary.audio/marketplace).

Using the private registry is as simple as configuring your npm client to load packages with the `@elemaudio` scope from
the appropriate URL, and with the appropriate API key.

## Making an account

To make an account on the private registry, simply visit [https://www.elementary.audio/account](https://www.elementary.audio/account) and sign up
or log in. You will receive an email with a sign-in link after entering your email address.

## Configuring npm

After signing in, you'll find the following instructions on your account dashboard.

```bash
# First, point npm to the Elementary private registry
$ npm config set "@elemaudio:registry" "https://www.elementary.audio/api/v1/registry/"

# Then, configure npm with your new API Key
$ npm config set "//www.elementary.audio/api/v1/registry/:_authToken" "YOUR_API_KEY_HERE"

# Finally, check that it works
$ npm install @elemaudio/compressor
```

## Notes

The private registry is only used for marketplace products. After configuring your client as above, any request for a public Elementary
package such as `@elemaudio/core` will simply be redirected from the private registry to the public npm registry. This should be a transparent
part of the installation procedure, but you may notice your `package-lock.json` or `yarn.lock` files resolving the public `@elemaudio/` packages
to `npmjs.org`.
