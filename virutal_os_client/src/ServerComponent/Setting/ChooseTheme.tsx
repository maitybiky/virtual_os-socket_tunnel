import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Theme, useStore } from "@/util/globalState/appSetting";

interface ChooseProps {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
  defaultVal: string;
}

export default function ChoosePreferences({
  label,
  onChange = () => {},
  options = [],
  defaultVal,
}: ChooseProps) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={defaultVal}
        onChange={(e) => onChange(e.target.value ?? "")}
      >
        {options.map((opt) => (
          <FormControlLabel
            value={opt.toLowerCase()}
            key={opt.toLowerCase()}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
