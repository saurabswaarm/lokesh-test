export const findNested = (listOfObjects, id) => {
  console.log(listOfObjects);
  for (let i = 0; i < listOfObjects.length; i++) {
    if (listOfObjects[i].id === id) {
      return listOfObjects[i].items;
    } else if (listOfObjects[i]?.items?.length > 0) {
      console.log('here');
      return findNested(listOfObjects[i].items, id);
    }
  }
};
