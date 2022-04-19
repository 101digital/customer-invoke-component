import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { CustomerInvokeComponentStyles } from ".";

const useMergeStyles = (
  style?: CustomerInvokeComponentStyles
): CustomerInvokeComponentStyles => {
  const { colors } = useContext(ThemeContext);

  const defaultStyles: CustomerInvokeComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1
    },
    progressBarStyle: {
      height: 5,
      width: "100%"
    },
    activeBarStyle: {
      height: "100%",
      backgroundColor: colors.secondaryColor
    },
    backButtonContainerStyle: {
      padding: 15,
      marginLeft: 12,
      marginTop: 26,
      marginBottom: 8,
      width: 100
    },
    container: {
      flex: 1,
      backgroundColor: "#5E0CBC"
    },
    container1: {
      flex: 1,
      backgroundColor: "#F1F6FC"
    },
    contentBox: {
      flex: 1,
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      marginBottom: 50,
      width: 330
    },
    messageTitle: {
      fontSize: 24,
      lineHeight: 36,
      fontWeight: "700",
      textAlign: "center",
      // fontFamily: fonts.medium,
      color: "#E06D6D",
      paddingTop: 50
    },
    messageDescription: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "700",
      textAlign: "center",
      // fontFamily: fonts.medium,
      color: "#fff",
      paddingTop: 16
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
