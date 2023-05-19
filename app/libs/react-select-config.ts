import { StylesConfig } from "react-select";

export const selectTheme = (theme: any) => ({
  ...theme,
  borderRadius: "0.5rem",
  colors: {
    ...theme.colors,
    primary25: '#d1fae5',
    primary: '#10b981',
  },
});

export const selectStyles: StylesConfig = {
  control: (base) => ({
    ...base,

    cursor: 'pointer',
    fontSize : "0.875rem",
    lineHeight: "1.25rem",
  }),
  option: (base) => ({
    ...base,

    cursor: 'pointer',
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "0.375rem"
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999
  }),
};