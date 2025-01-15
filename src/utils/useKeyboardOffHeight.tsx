import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);
  useEffect(() => {
    const keyboardWillAndroidShowListner = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillAndroidHideListner = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardOffsetHeight(0);
      }
    );

    const keyboardWillShowListner = Keyboard.addListener(
      "keyboardWillShow",
      (e) => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      }
    );
    const keyboardWillHideListner = Keyboard.addListener(
      "keyboardWillHide",
      (e) => {
        setKeyboardOffsetHeight(0);
      }
    );
    return () => {
      keyboardWillAndroidHideListner.remove();
      keyboardWillAndroidShowListner.remove();
      keyboardWillHideListner.remove(), keyboardWillShowListner.remove();
    };
  }, []);
}
