export const getObjectChangesInArabicAndEnglish = (oldObject, newObject) => {
  const changes = [];
  for (const key in newObject) {
    if (oldObject[key] !== newObject[key]) {
      changes.push({
        key,
        oldValue: oldObject[key],
        newValue: newObject[key],
      });
    }
  }

  return {
    isChanged: changes.length > 0,
    ar: `${changes.map((change) => `${change.key} : ${change.oldValue} تم تغييرها الى ${change.newValue}`).join("\n")}`,
    en: `${changes.map((change) => `${change.key} : ${change.oldValue} changed to ${change.newValue}`).join("\n")}`,
  };
};
