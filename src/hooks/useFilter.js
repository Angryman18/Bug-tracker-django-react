import { NEWESET_FIRST, DATE_ASC, DATE_DESC, A_Z } from "../helpers/filters";

const useFilter = () => {
  const masterFilter = (filterBy, data) => {
    const filterNewestFirst = (data) => {
      return data.sort((a, b) => {
        return b.id - a.id;
      });
    };

    const filterOldestFirst = (data) => {
      return data.sort((a, b) => {
          return a.id - b.id;
      });
    };

    const filterAtoZ = (data) => {
      return data.sort((a, b) => {
        return a.projectName.localeCompare(b.projectName)
      })
    }

    switch (filterBy) {
      case DATE_DESC:
        return filterOldestFirst(data);
      case A_Z:
        return filterAtoZ(data)
      default:
        return filterNewestFirst(data);
    }
  };

  return [masterFilter];
};

export default useFilter;
