import React from 'react';
import { MenuItem, FormControl, Select, InputLabel, TextField, Grid, Typography,Button } from '@material-ui/core';
import {useFinalInspectionReportMutation} from "../../services/inspectorapi"
import { useNavigate } from 'react-router-dom';
useNavigate

const ImportantDocuments = () => {
const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    rcAvailability: '',
    mismatchInRC: '',
    rtoNocIssued: '',
    insuranceType:  '',
    noClaimBonus: '',
    underHypothecation: '',
    roadTaxPaid: '',
    partipeshiRequest: '',
    duplicateKey: '',
    chassisNumberEmbossing: '',
    manufacturingDate: '',
    registrationDate: '',
    rto: '',
    fitnessUpto: '',
    cngLpgFitmentInRC: '',
    LoanStatus:''
  });

  const [finalInspectionReport] = useFinalInspectionReportMutation()
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleSubmit (e) {
  e.preventDefault()
     const inspectionData = {
      rcavailability:formData.rcAvailability ,
      mismatchInRC: formData.mismatchInRC,
      rtonocissued: formData.rtoNocIssued,
      insuranceType: formData.insuranceType,
      noClaimBonus: formData.noClaimBonus,
      underHypothecation:formData.underHypothecation ,
      loanStatus: formData.loanStatus,
      roadTaxPaid: formData.roadTaxPaid,
      partipeshiRequest:formData.partipeshiRequest,
      duplicateKey: formData.duplicateKey,
      chassisNumberEmbossing: formData.chassisNumberEmbossing,
      manufacturingDate:formData.manufacturingDate,
      registrationDate: formData.registrationDate,
      rto: formData.rto,
      fitnessUpto:formData.fitnessUpto,
      cnglpgfitmentInRC:formData.cngLpgFitmentInRC 
     }
  try {
    const res = finalInspectionReport({inspectionData})
    console.log(res)
    alert("Data Added")
    navigate("/inspector/car")

  } catch (error) {
    console.log(error)
  }
  }

  return (
    <div className='p-4'>
      <Typography variant="h4" className='text-black font-bold pb-5'>
        Important Documents
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* RC Availability */}
        <Grid item xs={12} sm={6} >
          <FormControl fullWidth>
            <InputLabel>RC Availability</InputLabel>
            <Select
              name="rcAvailability"
              value={formData.rcAvailability}
              onChange={handleChange}
              color="Green"
              
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Mismatch in RC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Mismatch in RC</InputLabel>
            <Select
              name="mismatchInRC"
              value={formData.mismatchInRC}
              onChange={handleChange}
            >
              <MenuItem value="No mismatch">No mismatch</MenuItem>
              <MenuItem value="Yes mismatch">Yes mismatch</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* RTO NOC Issued */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>RTO NOC Issued</InputLabel>
            <Select
              name="rtoNocIssued"
              value={formData.rtoNocIssued}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Insurance Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Insurance Type</InputLabel>
            <Select
              name="insuranceType"
              value={formData.insuranceType}
              onChange={handleChange}
             
            >
              <MenuItem value="Zero Depreciation">Zero Depreciation</MenuItem>
              <MenuItem value="Comprehensive">Comprehensive</MenuItem>
              <MenuItem value="3rd Party">3rd Party</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* No Claim Bonus */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>No Claim Bonus</InputLabel>
            <Select
              name="noClaimBonus"
              value={formData.noClaimBonus}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Under Hypothecation */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel> Loan Status</InputLabel>
            <Select
              name="LoanStatus"
              value={formData.LoanStatus}
              onChange={handleChange}
            >
              <MenuItem value="Paid/Closed"> Paid/Closed</MenuItem>
              <MenuItem value="unpaid/Pending">Unpaid/Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Under Hypothecation</InputLabel>
            <Select
              name="underHypothecation"
              value={formData.underHypothecation}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Road Tax Paid */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Road Tax Paid</InputLabel>
            <Select
              name="roadTaxPaid"
              value={formData.roadTaxPaid}
              onChange={handleChange}
            >
              <MenuItem value="OTT">OTT</MenuItem>
              <MenuItem value="LTT">LTT</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Partipeshi Request */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Partipeshi Request</InputLabel>
            <Select
              name="partipeshiRequest"
              value={formData.partipeshiRequest}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Duplicate Key */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Duplicate Key</InputLabel>
            <Select
              name="duplicateKey"
              value={formData.duplicateKey}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Chassis Number Embossing */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Chassis Number Embossing</InputLabel>
            <Select
              name="chassisNumberEmbossing"
              value={formData.chassisNumberEmbossing}
              onChange={handleChange}
            >
              <MenuItem value="Yes">Yes 
              </MenuItem>
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Rusted">Rusted</MenuItem>
              <MenuItem value="Repunched">Repunched</MenuItem>
              <MenuItem value="Traceable">Not Traceable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Manufacturing Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Manufacturing Date"
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Registration Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Registration Date"
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* RTO */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="RTO"
            name="rto"
            value={formData.rto}
            onChange={handleChange}
          />
        </Grid>

        {/* Fitness Upto */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Fitness Upto"
            type="date"
            name="fitnessUpto"
            value={formData.fitnessUpto}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* CNG/LPG Fitment in RC */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>CNG/LPG Fitment in RC</InputLabel>
            <Select
              name="cngLpgFitmentInRC"
              value={formData.cngLpgFitmentInRC}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="No mismatch">No mismatch</MenuItem>
              <MenuItem value="Yes mismatch">Yes mismatch</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div className="flex justify-between mt-10 px-8">
        <Button variant="contained" color="primary">
          Previous
        </Button>
        <Button
        type='submit'
          variant="contained"
          color="primary"
          className="rounded-lg bg-blue-500 text-white flex justify-center items-center"
        >
          Submit
        </Button>
      </div>
      </form>
    </div>
  );
};

export default ImportantDocuments;
