import React, { useState } from 'react';
import Header from './components/Header';
import ColorControls from './components/ColorControls';
import Preview from './components/Preview';
import FontControls from './components/FontControls';
import LocalFontLoader from './components/LocalFontLoader';
import Results from './components/Results';
import Info from './components/Info';
import { useApca } from './hooks/useApca';
import Color from 'colorjs.io';

function App() {
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#000000');
  const [textInputValue, setTextInputValue] = useState('#FFFFFF');
  const [bgInputValue, setBgInputValue] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState(400);
  const [currentFontMetrics, setCurrentFontMetrics] = useState(null);

  const { contrast, compliance } = useApca(
    textColor,
    bgColor,
    fontSize,
    fontWeight,
    currentFontMetrics
  );

  const isValidColor = (value) => {
    try {
      // Attempt parsing to validate any supported CSS color format.
      new Color(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const textInputValid = isValidColor(textInputValue);
  const bgInputValid = isValidColor(bgInputValue);

  const handleColorInputChange = (value, isText) => {
    // Update the text input field immediately for a responsive feel
    if (isText) {
      setTextInputValue(value);
    } else {
      setBgInputValue(value);
    }

    try {
      const color = new Color(value);

      // **THE DEFINITIVE FIX**: Force the output to be a 6-digit hex string.
      const hexValue = color.toString({ format: 'hex' });

      // This state is now always updated with a valid hex code.
      if (isText) {
        setTextColor(hexValue);
      } else {
        setBgColor(hexValue);
      }
    } catch (e) {
      // The input is not yet a valid color. Do nothing to the color state.
    }
  };

  const swapColors = () => {
    const newTextColor = bgColor;
    const newBgColor = textColor;

    // Swap the canonical colors that drive the display
    setTextColor(newTextColor);
    setBgColor(newBgColor);

    // Also swap the text values in the input fields
    setTextInputValue(newTextColor);
    setBgInputValue(newBgColor);
  };

  return (
    <div className="bg-gray-900 text-white antialiased">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="container mx-auto p-4 md:p-8">
        <Header />
        <main id="main-content" className="bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto" tabIndex="-1">
          <Preview
            textColor={textColor}
            bgColor={bgColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
            contrast={contrast}
          >
            <ColorControls
              textColor={textColor}
              textInputValue={textInputValue}
              onTextInputChange={(value) => handleColorInputChange(value, true)}

              bgColor={bgColor}
              bgInputValue={bgInputValue}
              onBgInputChange={(value) => handleColorInputChange(value, false)}
              textInputValid={textInputValid}
              bgInputValid={bgInputValid}

              swapColors={swapColors}
            />
          </Preview>
          <FontControls
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontWeight={fontWeight}
            setFontWeight={setFontWeight}
          />
          <LocalFontLoader setCurrentFontMetrics={setCurrentFontMetrics} />
          <Results compliance={compliance} />
          <Info />
        </main>
      </div>
    </div>
  );
}

export default App;