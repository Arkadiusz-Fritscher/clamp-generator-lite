export default function pxToRem(entry) {
  const baseFont = 16;

  const remValues = JSON.parse(JSON.stringify(entry));

  for (const [key, value] of Object.entries(remValues)) {
    if (value?.unit === "px") {
      value.input = +value.input / baseFont;
      value.unit = "rem";
    }

    if (key === "unit" && value === "px") {
      remValues.unit = "rem";
      remValues.input = +remValues.input / baseFont;
    }
  }

  return remValues;
}
