import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import folderStructure from './FileStructure';
import { findNested } from './findInObject';

function App() {
  const [openFolder, setOpenFolder] = useState([]);

  const markId = (id) => {
    console.trace();

    if (openFolder.includes(id)) {
      openFolder.splice(
        openFolder.findIndex((item) => item === id),
        1
      );
    } else {
      openFolder.push(id);
    }
    console.log('inside', openFolder);
    setOpenFolder([...openFolder]);
  };

  console.log('rendered', openFolder);

  return (
    <List
      listOfItems={folderStructure}
      indentationFactor={0}
      openFolder={openFolder}
      markId={markId}
    />
  );

  // give folder structure as a list
  // for each item in the list show the name
  // when clicked splice in the children with indentation
}

export default App;

function List({ listOfItems, indentationFactor, openFolder, markId }) {
  return (
    <Container indentationFactor={indentationFactor}>
      {listOfItems.map((item, index) => {
        return (
          <>
            <div id={item.id} key={index} onClick={() => markId(item.id)}>
              {item.name}
            </div>
            <br />
            {item.items.length > 0 && openFolder.includes(item.id) ? (
              <List
                listOfItems={item.items}
                indentationFactor={indentationFactor + 1}
                markId={markId}
                openFolder={openFolder}
              />
            ) : (
              ''
            )}
          </>
        );
      })}
    </Container>
  );
}

function Container({ children, indentationFactor }) {
  return (
    <div
      style={{
        // border: '1px solid black',
        width: '300px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        marginLeft: `${parseInt(indentationFactor) * 10}px`,
      }}
    >
      {children}
    </div>
  );
}

// {folderStructure.items.map((item) => {
//   return <div id={item.id} onClick={() => openUp(item.id)}>{item.name}</div>;
// })}
