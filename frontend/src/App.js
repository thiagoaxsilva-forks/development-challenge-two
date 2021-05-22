import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteAPatientStart,
  getAllPatientsStart,
  patchAPatientStart,
  postAPatientStart,
} from "./store/patients/patients.actions";
import { createStructuredSelector } from "reselect";
import { selectAllPatients } from "./store/patients/patients.selectors";
import {
  AppBar,
  Card,
  Container,
  CssBaseline,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "./components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "./components/Popup";
import PatientsForm from "./components/PatientsForm";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const columns = [
  { id: "id", label: "Id" },
  { id: "firstName", label: "Nome" },
  {
    id: "birthDate",
    label: "Data de nascimento",
    align: "left",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "phone",
    label: "Telefone",
    align: "left",
    format: (value) => value.toLocaleString("pt-BR"),
  },
  {
    id: "actions",
    label: "Ações",
    align: "left",
    format: (value) => value.toLocaleString("pt-BR"),
  },
];

const App = ({
  getAllPatients,
  patients,
  postPatient,
  patchPatient,
  deletePatient,
}) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    getAllPatients();
  }, []);

  const addOrEdit = (patient, resetForm) => {
    if (patient.id === 0) postPatient(patient);
    else
      Object.entries(patient).forEach((attribute) =>
        patchPatient(patient.id, attribute[0], attribute[1])
      );

    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (patient) => {
    setRecordForEdit(patient);
    setOpenPopup(true);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LocalHospitalIcon />
          <Typography variant="h6">Pacientes</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Pacientes
            </Typography>
          </Container>
          <Paper className={classes.pageContent}>
            <Toolbar>
              <Controls.Button
                text="Adicionar Paciente"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              />
            </Toolbar>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.id}</TableCell>
                      <TableCell>
                        {patient.firstName} {patient.lastName}
                      </TableCell>
                      <TableCell>
                        {new Date(patient.birthDate).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>
                        <Controls.ActionButton
                          color="primary"
                          onClick={() => {
                            openInPopup(patient);
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                            deletePatient(patient.id);
                          }}
                        >
                          <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Popup
            title="Formulário Paciente"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <PatientsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
        </div>
      </main>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  patients: selectAllPatients,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPatients: () => dispatch(getAllPatientsStart()),
  postPatient: (patient) => dispatch(postAPatientStart(patient)),
  patchPatient: (id, attribute, value) =>
    dispatch(patchAPatientStart(id, attribute, value)),
  deletePatient: (id) => dispatch(deleteAPatientStart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
