# customer-invoke-component

## Feature

- Open invoke customer

## Installation

To add the customer-invoke-component to React Native app, run this command with tag version

```sh
yarn add https://github.com/101digital/customer-invoke-component.git#{tag-version}
```

Make sure you have permission to access this repository

- The theme-component is using [react-native-localize](https://github.com/zoontek/react-native-localize) to get default country code for iOS device. Make sure you installed and linked it to your app.
- Installed [react-native-webview](https://github.com/react-native-webview/react-native-webview)

## Quick Start

### Init API Service

- `CustomerinvokeService` is initiated should be from `App.ts`

```javascript
import { CustomerinvokeService } from 'customer-invoke-component';

CustomerInvokeService.instance().initClients({
  contactBaseUrl: 'url'
});
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](customer-invoke-data.json) into your app locale file. You can also change text value, but DON'T change the key.

### CustomerInvokeComponent

Open a web-view to cutomer can add help details

- Props, styles and component can be found [here](./src/components/customer-invoke/types.ts)

- Example

```javascript
const HelpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomerInvokeComponent
        initData={{
          firstName: firstName,
          lastName: lastName
        }}
        onBack={() => {}}
        onCompleted={applicationDetails => {}}
        initStep={{
          id: 'main-details',
          title: 'We want to know you more',
          subTitle: 'Enter main details.',
          progress: 5 / 12
        }}
      />
    </SafeAreaView>
  );
};
```
