# irio

`irio` is a full-stack universal framework for creating fast ultra-modern website and web applications while enjoying great developer experience and saving precious time.

The progressive web app qualities are achieved due to the use of the service-worker.

## What Is `Irio`

`irio` is a Node.js framework software that allows to build both `back-end` and `front-end` applications at the same time with the help of `JSX` syntax. One does not need to have to know a lot about the `React` product to write such syntax, which makes it possible for the small team of developers or a single developer to tackle the problem of creating a modern websites. Moreover, the website being developed automatically becomes a progressive web app, which gives the opportunity to reach a more wide group of users, and provide them with the wonderful experience brought by the closer integration with the native OS (such as an iPhone or Android device),

By reusing React components on both **server-side code** and **bundled browser code**, loading of applications becomes very fast. This fact plays an important role when it comes to Search Engine Optimisation.

## Why Use `Irio`

Coupled with the principle of splitting each page into a separate folder and automatically initialising as pages on the website, `irio` achieves the aim of making a new **universal website** in seconds. The bundles are generated with `browserify` and dead-code elimination can take place. By contrast to `Webpack`, one does not have to be tied to the building paradigm, as `browserify` presents as more flexible software. `Hacking browserify pipeline` produces more fun than playing with corporate webpack.

## Configuration

The server is configured via the main `app.js` file, where a new instance of `irio` is created. The configuration is passed the the first argument, however is not necessary, since `irio` will work with default settings, but more extended methods can be specified, such as caching.

```js
import idio from 'idio'

const { url, app, methods, router } = await irio({

})
```

## Structure

`irio` expects the structure to be normalised so that it can easily initiate it and start the website. It assumes that the website is centred around the `GET` pages, so that every __route__ is put into the `pages` folder. The `POST` request are handled with `forms` subdirectory in route.

All JavaScript files found in the `scripts` directory will be embedded into the page and served as static files. The scripts are compiled with `babel` so the newest language features are available to the programmer, including `async/await`, `import Component from '../Component'` and JSX `<Component data={...data}><Component>`.

The styles should be put in the `styles` directory and also served as static files and embedded into the page using the `<link>` tag.

When a user makes a request to a given route, the server executes the `index.jsx` script which should require the `Page.jsx` found in components. The react internal representation will be built according to this logic (this means that the hydration will be executed against the `Page.jsx` component in the main `div` of the website). Because the rendering of the page is done on the server, the website is served extremely fast, and once the React bundle is loaded, the client will perform only local navigation, that is render pages client-side without querying the server. The dynamic data is then fetched via an AJAX API interface of the app. Because the user might not interact with the website for the first 10 seconds, during that time the browser bundle is loaded and evaluated, so that the next page can be available in no time.

```sh
irio/
├── index.js
├── dev.js
├── package.json
├── pages
│   ├── index
|   │   ├── images
|   │   │   └── world.jpg
|   │   ├── scripts
|   │   │   ├── index.js
|   │   │   └── service-worker.js
|   │   ├── styles
|   │   │   └── index.css
|   │   ├── Components
|   │   │   └── Page.jsx
|   │   └── index.jsx
├── | editorial
|   │   ├── scripts
|   │   ├── styles
|   │   ├── Components
|   │   └── index.js
│   └── special
|       ├── scripts
|       ├── styles
|       ├── Components
|       └── index.js
├── scripts
│   └── jquery.js
├── static
└── upload
```

## Starting Server

The `yarn start` or `yarn dev` commands can be run to start the server. The first one will attempt to build the website and serve the built version (as used in the Docker container), whereas the `dev` command will run a local version tailed for the developer experience.

## Deployment In Cloud

An easy and solid deployment process is achieved with the Docker image. Based on the Node-alpine docker image with `yarn` support, the website can be deployed to a Linux container.

## Deployment to `demimonde.cc`

[`Demimonde`](https://demimonde.cc) is a service to host `irio` websites. For easy deployment of the applications, a `demimonde` account with an API key can be registered. It also provides access to the analytics of site usage via the back-end and not the front end (that is, from the server logs with the `ElasticSearch` integration), without having to embed third-party script bundles (such as analytics scripts).

## Privacy Notice

The privacy notice to comply with the regulations is shown to users when session is made use of for the first time. This means if no tracking of usage is performed by the application and it does not send analytical data, the notice is not required, but on the condition that the data gathered using back-end analytics engine Elastic Search is depersonalised and could not be used to devise each natural person's identity.

However, if the application does store the user data, a Privacy Policy generator feature of `irio` can be used to make a special section in regards to the privacy. Via this feature, website creators can go through a guided process of creating such policy for their website in order to comply with the European Data Protection Regulation 2018. A number of templates are provided.
<!-- , and phone support and consultations are provided by **Demimonde**. -->

<!-- gain access to a check-list and step-by-step instructions along with the recommendations and suggestions in the user interface are -->

## Mongo Database

`irio` enjoys the implementation of a database interface. The mongo connection will be established when the connection string is passed, however by default, the database is not used.

```js
{
  "database": process.env.MONGO_URL
}
```

## Service Worker

The `service-worker.js` script makes the app __progressive__ as it allows to load the application shell quickly and cache it for later use from the device.

## Image Optimisation

The developers do not have to worry about embedding the right type of image, and can put the maximum resolution possible. During the `build` process, `irio` will generate smaller versions of the image.

When an image is added to the source code of the page with `<image>` component, and the parser pick up those tags to adapt the image to be responsive to different resolutions, and include correct `html` required to render the optimised image.

For example, the following snippet is used to generate an html for a page:

```jsx
<div id="Hello">
  <image src="images/world.jpg" alt="World is everywhere around you.">
</div>
```

```html
<figure>
    <picture>
    <source media="(min-width: 750px)"
            srcset="images/world-1600_large_2x.jpg 2x,
                    images/world-800_large_1x.jpg" />
    <source media="(min-width: 500px)"
            srcset="images/world_medium.jpg" />
    <img src="images/world_small.jpg" alt="World is everywhere around you.">
    </picture>
    <figcaption>World is everywhere around you.</figcaption>
</figure>
```

https://developers.google.com/web/ilt/pwa/lab-responsive-images

### Offline Caching

Because pages are read from the `pages` directory, `irio` makes a representation of the website (including aliases) accessible for browser caching via the `service-worker`.

It is not enabled by default but when it is, it will cache specified pages on a user's device.

Pages for caching can be added using the code below:

```js
{
  cache: [
    "world"
  ]
}
```

Alternatively, caching can be enabled on the individual basis and be set from pages, e.g.,

```js
/* pages/world/index.jsx */
export default async (ctx, next) => {
  ctx['service-worker'].cache({
    includeAssets: true, // adds assets by default
  })
  // ---^ adds this page and aliases to cache
}
```

<!-- Pages for caching can be excluded using the following option:

```js
{
  excludeCache: [
    '/weather'
  ],
}
``` -->

https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker

### Push Notifications

Request permissions for `push notifications` and make use of Amazon Lambda functions to process emails and push messages to the SNS. Such functionality is achieved with the `pompeii` package which provides the lambda function and the means to push it to the S3 bucket, and automatically configure a new function.

https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

With proposed structure the applications can use `service-worker` to cache pages for progressive web apps, and receive push notifications.

### Site Map Generation

### Static Site Generator

## building

### minification

The minifaction is achieved with `uglifyify`

### tree-shaking

Some form of tree shaking was made possible thanks to `common-shakeify`.

### CDN resources

The `react` and other external vendor distributions are imported into the page with UMD syntax, that is in the global variable via `window`. For instance, the following scripts will be added into the document to make the whole idea possible.

`https://cdnjs.cloudflare.com/ajax/libs/react/16.3.2/umd/react.production.min.js`
`https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.3.2/umd/react-dom.production.min.js`
`https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.0/redux.min.js`
`https://cdnjs.cloudflare.com/ajax/libs/react-redux/5.0.7/react-redux.min.js`

Although not shown above, the resources will be added with the `sha256` validation, e.g.,

```js
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/react/16.3.2/umd/react.production.min.js"
  integrity="sha256-R9mHnFtrqNBSv0u7IGrwrn8TxfZaWD0UjHo9xvqDHSM"
  origin="anonymous"
>
</script>
```

For [bootstrap](#bootstrap-grid), the viewport `width=device-width, initial-scale=1, shrink-to-fit=no` will be set,

When running a local version, the local js files corresponding to the above are added to the source code of pages. This makes development without an internet connection possible.

## Bootstrap grid

Bootstrap is assumed to be the preferred grid system.

## jQuery

jQuery can be used, however it is not configured by default. This should be done when using bootstrap's JS.

## Markdown support

Pages can be written in mark down and sent as part of the stream.

## Developer Nicesities

Because developers develop websites, they need to have the best tools to do it in the most effective way -- in other words, to work smart. `irio` puts the developer on the first place and prioritises the developer experience.

### Hot Module Reload

Client-side React component replacement is made possible due to the use of `livereactload``@4` package. When the `NODE_ENV` is set to `development`, it will wrap the bundle in the code necessary to perform the hot module reload of React components. This allows for instant refresh of the page appearance in the browser window after a change in the source code.

When `NODE_ENV` is set to `production`, the code wrapping is disabled by pruning the `if (process.env.NODE_ENV == 'development') { ... }` tree during the minification process.

### Hot Route Reload

Server-side reload will refresh a particular route when it sees an update to files in the route directory. Whereas **hot module reload** performs the refresh of the page via the `socket.io`client, the hot route reload just updates the back-end handler to use the newer version of the page.

## `irio():void`

Call this function to get a result you want.

```js
import irio from 'irio'

(async () => {
  irio()
})()
```

---

(c) [artdecocode][1] 2018

[1]: https://artdeco.bz
