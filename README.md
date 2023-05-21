# Intro

This project is a basic [React Native](https://facebook.github.io/react-native/) template that can be used to kickstart a mobile application. It is basically a complete package of
- [NativeBase](https://nativebase.io/) for styled components
- [Mobx-State-Tree](https://mobx-state-tree.js.org/intro/getting-started) for state management
- [Axios](https://www.npmjs.com/package/axios) for API calls
- [React Navigation](https://reactnavigation.org/) for navigation
- [React-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) for vector icons 
& much more

# This repo includes configuration of following packages

- React Native v0.68
- NativeBase (UI library) v3.4.x
- Basic folder structure
- React native reanimated v2.11.0
- React Navigation (stack, tab & drawer) v6.x
- Responsive file added in utils
- MobxStateTree or MST (state management)
- React native permissions v3.6.1
- Axios v1.1.3 (with index.js file setup for post, get etc.)
- React native toast message v2.1.5
- React native vector icons v9.2.0
- React native fast image v8.6.1
- React native webview v11.23.1
- @react-native-async-storage/async-storage
- React native internet connection alert v0.1.9
- React native background timer v2.4.1
- React native image picker v4.10.0


# Help / Info

1. NativeBase, sometimes space={2}, space={3} etc.. prop does n't work so there is premade component for that ```<AddSpace> in src/utils/AddSpace.js``` - just use as wrapper & it'll add spaces.

2. NativeBase, wrap App.js around ```<NativeBaseProvider>``` & to write full code

3. Reanimated, always import this at top of app.js -> ```import 'react-native-gesture-handler'```

4. Responsive-ui, file added in ```src/utils/responsive-ui.js``` use it accordingly.

5. MST, just read the use/help doc in ```src/store/help.txt```

6. React-native Permissions, in files ```info.plist``` for ios & ```androidmanifest.xml``` for android, uncomment permission you want to use in app & use function
   ```requestDevicePermission('permission name') ``` from ```src/utils/request-permissions.js```

7. Config.js, please provide ```APP_NAME, BASE_URL``` of your app here and other config details (if any)!

8. axios.js, easily send post & get calls on api using functions at ```src/utils/axios.js```. USE LIKE THIS IN APP -->
```sh
   const xyz = async() => {
   var response = await getData('endpoint','body')
   }
   ```

   where xyz is any function like pressHandler etc..

   [also Loader is pre-added it starts as soon as you send call for API & stops as soon as response arrives]

9. Toast, always import & add ```<Toast />``` at ```end``` of innercode in App.js

10. Vector-Icons, Use with ```<Icon />``` from 'native-base' & find the icon names here -> https://oblador.github.io/react-native-vector-icons/ (try avoiding fontAwesome5 icons, they might break code)

11. Fast Image, always use ```<FastImage />``` component rather than ```<Image>```.

12. Async storage, library added but basic use is here ->
```sh
    const xyz = async(value) => {
    await AsyncStorage.setItem('key name', value)
    }
```

    where xyz is any function to store value here & we can get the same item using AsyncStorage.getItem('key name')

13. Internet Connection Alert, cover the whole App.js with its 
```sh
<InternetConnectionAlert>
 {...rest of code}
</InternetConnectionAlert> 
```
for alerts when internet goes down.

14. Background timer, good for using at otp screens where you need countdown to decrease as per seconds but the problem we face using useTimeout is, it only works in foreground. So to keep that countdown timer working in background. this plugin is installed. for basic example in using otp screen is following ->

```sh
    import BackgroundTimer from 'react-native-background-timer';
      const [countdown, setCountDown] = useState(10); //10 is 10 seconds here
      useEffect(() => {
        let timer =
          countdown > 0 &&
          BackgroundTimer.runBackgroundTimer(
            () => setCountDown(countdown - 1), //useState here
            1000,
          );
        return () => BackgroundTimer.stopBackgroundTimer(timer);
      }, [countdown]);
      return (<Text>{countdown}</Text>)
```

15. Image Picker & Image Capture, this library is implemented so that one can pick image from mobile's gallery or capture image from camera & then further use it. Check detailed but simplified example following ->

```sh
    <--for launch camera-->
    
    import {launchCamera} from "react-native-image-picker";
    
    const App = () => {
    
      const [imageUri, setImageUri] = useState(""); //declare state

      const openCamera = () => {
      let options = {
        storageOptions: {
          path: "images",
          mediaType: "photo",
        },
        includeBase64: true,
      };
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log("User cancelled the image picker");
        } else if (response.error) {
          console.log("Image pick error!", response.error);
        } else if (response.customButton) {
          console.log("User tapped custom button", response.customButton);
        } else {
          const source = {
            uri: "data:image/jpeg;base64," + response.assets[0].base64,
          };
          setImageUri(source); //update state here
        }
       });
      };

      return(
         <Image source={imageUri} 
                style={{width:100,height:100}} //edit style by self
          /> //trigger openCamera function as per your need
        )
    }
```

    Also live camera may/may not work on ios simulator, you'll need a real testing device for that.

```sh
    <--for image picker from phone gallery-->
    
    import {launchImageLibrary} from "react-native-image-picker";
    
    const App = () => {
    
      const [galleryImageUri, setGalleryImageUri] = useState(""); //declare state

      const openGallery = () => {
        let options = {
          storageOptions: {
            path: "images",
            mediaType: "photo",
          },
          includeBase64: true,
        };
        launchImageLibrary(
          options,
          response => {
            // console.log("Response", response);
            if (response.didCancel) {
              console.log("User cancelled the image picker");
            } else if (response.error) {
              console.log("Image pick error!", response.error);
            } else if (response.customButton) {
              console.log("User tapped custom button", response.customButton);
            } else {
              const source = {
                uri: "data:image/jpeg;base64," + response.assets[0].base64,
              };
              setGalleryImageUri(source); //update state here
            }
          },
        );
      };

      return(
          <Image source={galleryImageUri} 
                 style={{width:100,height:100}} //edit style by self
           /> //trigger openGallery function as per your need
       )
    }
  
    <----------------------------------------------------x---------------------------------------------------->
```
    
    github link: https://github.com/react-native-image-picker/react-native-image-picker

