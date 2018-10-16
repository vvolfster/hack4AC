# Sharing Warmth

This project is MIT licensed so that you may freely learn and help others as we have.

## TEAM SHRIMP  
            
with thanks to:
#### Anam, Shahan, Greyson, Yves, Bharath, Shweta, Jason, Annie, Brett  
* Hack for a Cause 2018  
* Twenty Ideas
* Emberex
* Egan Warming Center (Shelley was amazing)  

## setup

requires Node 8.9.0  

It is recommended that you use nvm. If you don't have it already get it from here: https://github.com/coreybutler/nvm-windows/releases
* Make sure you delete your C:\Users\<user>\AppData\Roaming\npm folder!! Nvm does not function properly if you have that. winKey + R. %appData% to get to that folder quickly.

nvm install 8.9.0
nvm use 8.9.0

Please install all these things first!

https://drive.google.com/drive/u/0/folders/1D2xB3qa0dDsw9-XCXYewMHCkbG0eWtF-  

npm install -g vue-cli  
npm install -g quasar-cli
npm install -g firebase-tools

git clone https://github.com/vvolfster/hack4AC.git  
npm install

If you are using VSCODE (Recommended)  
https://marketplace.visualstudio.com/items?itemName=mubaidr.vuejs-extension-pack  



* To run:
`quasar dev`
or `npm start`

* To test firebase functions:
`cd functions`
`npm run shell`
or `npm test`

* To deploy functions:
`firebase deploy --only functions`
or `npm run deploy`

* To deploy hosting:
`quasar build`
`firebase deploy --only hosting`
or `npm run deploy:hosting`


### shrimp-vue-components
We are using an open source repo I have created to speed us up. 
It has decent docs about all its components & it has some powerful features.

https://github.com/vvolfster/shrimpVueComponents

### How do i login / logout?
Press f7 to bring up login!
We can allow google auth or disable it!


#### WAAH i wanna read data from the db
I've written a magical plugin. It gives each component an innate zsubData property innately.

If you add zsubscriptions to your data, it will magically populate the zsubData property with the respective data entries in your zsubscriptions array.
```
<template>
    <pre>
        {{ JSON.stringify(zsubData, null, 2) }}
    </pre>
</template>

<script>
export default {
    name: 'PageIndex',
    data() {
        return {
            zsubscriptions: ["org/egan"]    // subscribe to this path in the database. CHANGES ARE REALTIME.
        }
    }
}
</script>
```


#### I Wanna see the whole db / make changes to it ####
You can either:
```
Run the app, navigate to /fbadmin. 
```

or

```
Ask me (wolf) to add you to the firebase console
Go to the firebase console
```

### Server request/response (subscriptions) in your components

In the `data: {}` section of your component, add `zsubscriptions` in the `return` statement. The value should reflect what database object you want to listen to. For example, adding `zsubscriptions: ["org/egan"]` will give the component access to the Egan Warming Center data in the `org` database table. Here is the code snippet that you need to use:
```
data() {
    return {
        zsubscriptions: ["org/egan"], // subscribe to the database
        siteId: this.$route.params.siteId, // grab the id from the route (this is not required to make server requests)
    };
},
```

Then, you can use `this.zsubdata` in a `try`/`catch` in the `computed` properties of your component, like this:
```
site() {
    try {
        return this.zsubData["org/egan"].site[this.siteId];
    } catch (e) {
        return {};
    }
},
```
After that, you can use `site` in the view of your component.
