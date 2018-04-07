# hack4AC

requires Node 8.9.0  

If you have nvm,

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
Ask me(wolf) to add you to the firebase console
Go to the firebase console
```

