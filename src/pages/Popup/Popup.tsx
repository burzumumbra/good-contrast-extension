import React, { useState } from 'react';
import styled from 'styled-components';
import './Popup.css';

const Container = styled.div<{$active: boolean}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({$active}) => $active ? '#fff' : '#1E4147'};
  transition: all 0.5s ease;
`;

const Button = styled.button<{$active: boolean}>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${({$active}) => $active ? '#1E4147' : '#fff'};
  color: ${({$active}) => $active ? '#1E4147' : '#fff'};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: all 0.5s ease;
  width: 10rem;
  min-width: 5rem;
  &:hover {
    cursor: pointer;
  }
`;

const Popup = () => {

  const [isStyleApplied, setIsStyleApplied] = useState(false);

  const baseStyle = `
    body, main, div {
      background-color: #1E4147;
      border-color: #fff !important;
    }
    h1, h2, h3, h4, h5, h6
    pre, p, blockquote, figure, hr, dl, dd, ol, ul, fieldset, legend, span, a, abbr, b, em, i, small, strong, sub, sup, code, kbd, samp, button, input, textarea, select, option, optgroup, label, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
      color: #fff !important;
      background-color: #1E4147 !important;
      border-color: #fff !important;
    }
    code {
      color: #fff !important;
      background-color: #1E4147 !important;
    }
  `;
  
  const applyStyle = () => {
    chrome.tabs.query({active: true, currentWindow: true}, async (tab) => {
      // eslint-disable-next-line no-undef
      const currentTab = tab[0];
      console.log(currentTab)
      await chrome.scripting.insertCSS({
        css: baseStyle,
        target: { tabId: currentTab.id },
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
