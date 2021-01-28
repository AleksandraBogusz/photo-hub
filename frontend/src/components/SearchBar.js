import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";

import { useState } from 'react'

export const SearchBar = () => {
  const [value, setValue] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    window.location.replace(`http://localhost:3000/home?q=${value}`)
  };

  return (
    <Form inline onSubmit={onSubmit}>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => {
            setValue(event.target.value);
          }}
          value={value}
        />
      </InputGroup>
    </Form>
  );
};
