import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";

const genderItems = [
  { id: "male", title: "Masculino" },
  { id: "female", title: "Feminino" },
  { id: "other", title: "Outro" },
];

const initialFValues = {
  id: 0,
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "male",
  occupation: "",
  address: "",
  city: "",
  estate: "",
  nationality: "",
  birthDate: new Date(),
};

const PatientsForm = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Esse campo é obrigatório.";

    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Esse campo é obrigatório.";

    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email não é válido.";

    if ("phone" in fieldValues)
      temp.phone =
        fieldValues.phone.length > 9
          ? ""
          : "O número de telefone deve ter 10 dígitos contando com o DDD.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="Primeiro Nome"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Controls.Input
            name="middleName"
            label="Nome do meio"
            value={values.middleName}
            onChange={handleInputChange}
            error={errors.middleName}
          />
          <Controls.Input
            name="lastName"
            label="Sobrenome"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Telefone"
            name="phone"
            value={values.phone}
            onChange={handleInputChange}
            error={errors.phone}
          />
          <Controls.Input
            label="Ocupação"
            name="occupation"
            value={values.occupation}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Endereço"
            name="address"
            value={values.address}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Cidade"
            name="city"
            value={values.city}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Estado"
            name="estate"
            value={values.estate}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Nacionalidade"
            name="nationality"
            value={values.nationality}
            onChange={handleInputChange}
          />
          <Controls.RadioGroup
            name="gender"
            label="Sexo"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.DatePicker
            name="birthDate"
            label="Data de Nascimento"
            value={values.birthDate}
            onChange={handleInputChange}
          />

          <div>
            <Controls.Button type="submit" text="Enviar" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default PatientsForm;
