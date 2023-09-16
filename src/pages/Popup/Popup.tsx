import React, { useState } from 'react';

import { Container, Button } from './components/styledComponents';
import htmlTags from '../../consts/html-tags-categorized.json';
import './Popup.css';

const Popup = () => {

  console.log(htmlTags);

  const findElementsInTab = () => {
    htmlTags.TextAndFormatting.forEach((tag) => {
      document.querySelectorAll(tag).forEach((element) => {
        console.log(element);
        console.log(typeof(element))
        // element.style.backgroundColor = '#1E4147';
        // element.style.color = '#fff';
      });
    }
    );
  };

  const [isStyleApplied, setIsStyleApplied] = useState(false);
  const defaultProperties = `{ background-color: #1E4147; color: #fff !important;}`;

  const applyStyle = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tab) => {
      await chrome.scripting.executeScript({
        target: { tabId: tab[0].id },
        function: findElementsInTab,
      });
    });
  }
  
  const toggleStyle = () => {
    if (isStyleApplied) {
      removeStyle();
    } else {
      applyStyle();
    }
    setIsStyleApplied(!isStyleApplied);
  }

  const removeStyle = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tab) => {
      // eslint-disable-next-line no-undef
      const currentTab = tab[0];
      console.log(currentTab)
      await chrome.scripting.removeCSS({
        css: baseStyle,
        target: { tabId: currentTab.id },
      });
    });
  }

  return (
    <Container $active={isStyleApplied}>
      <Button 
        $active={isStyleApplied} 
        onClick={toggleStyle}
      >
        {isStyleApplied ? 'Go back 🙄' :'Make it readable! 😁'}
      </Button>
    </Container>
  );
};

export default Popup;
