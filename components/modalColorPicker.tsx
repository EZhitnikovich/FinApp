import { Modal } from "react-native";
import { TriangleColorPicker } from "react-native-color-picker";

type ModalColorPickerProps = {
  isVisible: boolean;
  defaultColor?: string;
  onColorSelected: (color: string) => void;
};

export const ModalColorPicker = ({
  isVisible,
  defaultColor,
  onColorSelected,
}: ModalColorPickerProps) => {
  return (
    <Modal visible={isVisible}>
      <TriangleColorPicker
        defaultColor={defaultColor ?? "#ff0000"}
        onColorSelected={(color) => onColorSelected(color)}
        style={{ flex: 1, width: "100%" }}
      />
    </Modal>
  );
};
