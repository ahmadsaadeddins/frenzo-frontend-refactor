import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  setDevice,
  setError,
  createNewDevice,
  deviceAdded,
  resetDevice,
  setErrorInput,
  fetchAllDevices,
  devicesReceived,
  devicesLoading,
} from "./devicesSlice";

// import ErrorOrder from "../../components/gaming/ErrorOrder";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ComputerIcon from "@material-ui/icons/Computer";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "components/CustomButtons/Button.js";
import FormHelperText from "@material-ui/core/FormHelperText";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-pro-react/customSelectStyle.js";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const useStylesToolTip = makeStyles(tooltipsStyle);
const useStyles = makeStyles(styles);

const CreateDevice = () => {
  const history = useHistory();
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const device = useSelector((state) => state.devices.device);
  const error = useSelector((state) => state.devices.error);
  const loading = useSelector((state) => state.devices.loading);
  const classes = useStyles();
  const classesTooltip = useStylesToolTip();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewDevice(device))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        if (originalPromiseResult.id) {
          dispatch(deviceAdded(originalPromiseResult));
          dispatch(resetDevice({}));

          history.push("/");
          dispatch(setError(""));
        } else {
          dispatch(setError(originalPromiseResult));
        }
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        dispatch(setError(rejectedValueOrSerializedError.message));
      });
  };
  useEffect(() => {
    dispatch(fetchAllDevices())
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        dispatch(devicesLoading());
        dispatch(devicesReceived(originalPromiseResult));
      });
  }, []);

  //   if (!isAuthenticated) {
  //     return <Redirect to="/login" />;
  //   }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <GridContainer justify="center" style={{ direction: "rtl" }}>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <FormControl
              style={{ marginTop: "6px" }}
              fullWidth
              error={error.name ? true : false}
            >
              <InputLabel htmlFor="name" className={classes.selectLabel}>
                الجهاز
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu,
                }}
                classes={{
                  select: classes.select,
                }}
                value={device.name ? device.name : ""}
                onChange={(e) => dispatch(setDevice(["name", e.target.value]))}
                onFocus={(e) => error && dispatch(setErrorInput(["name", ""]))}
                inputProps={{
                  name: "name",
                  id: "name",
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem,
                  }}
                >
                  الجهاز
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value="PC"
                >
                  PC
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value="PS"
                >
                  PS
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value="XBOX"
                >
                  XBOX
                </MenuItem>
              </Select>
              {error.name ? (
                <FormHelperText error id="name-error-text">
                  {error.name}
                </FormHelperText>
              ) : null}
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <CustomInput
              labelText="رقم الجهاز"
              id="number"
              error={error.number ? true : false}
              formControlProps={{
                fullWidth: true,

                value: device.number,
                onChange: (e) =>
                  dispatch(setDevice(["number", e.target.value])),
                onFocus: (e) =>
                  error && dispatch(setErrorInput(["number", ""])),
              }}
              inputProps={{ "aria-label": "description" }}
            >
              {error ? (
                <FormHelperText error id="name-error-text">
                  {error.number}
                </FormHelperText>
              ) : null}
            </CustomInput>
          </GridItem>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <CustomInput
              labelText="المعالج"
              id="cpu"
              formControlProps={{
                fullWidth: true,
                value: device.cpu,
                onChange: (e) => dispatch(setDevice(["cpu", e.target.value])),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <CustomInput
              labelText="الذاكره"
              id="ram"
              formControlProps={{
                fullWidth: true,
                value: device.ram,
                onChange: (e) => dispatch(setDevice(["ram", e.target.value])),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={2} lg={1}>
            <CustomInput
              labelText="كارت الشاشه"
              id="vga"
              formControlProps={{
                fullWidth: true,
                value: device.vga,
                onChange: (e) => dispatch(setDevice(["vga", e.target.value])),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <CustomInput
              labelText="الهارد"
              id="hdd"
              formControlProps={{
                fullWidth: true,
                value: device.hdd,
                onChange: (e) => dispatch(setDevice(["hdd", e.target.value])),
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={2} md={1} lg={1}>
            <CustomInput
              labelText="الشاشه"
              id="monitor"
              formControlProps={{
                fullWidth: true,
                value: device.monitor,
                onChange: (e) =>
                  dispatch(setDevice(["monitor", e.target.value])),
              }}
            />
          </GridItem>
          <Tooltip
            id="tooltip-left"
            title="اضافه جهاز"
            placement="left"
            classes={{ tooltip: classesTooltip.tooltip }}
          >
            <Button
              style={{ marginTop: "20px" }}
              justIcon
              disabled={loading}
              color="facebook"
              size="sm"
              type="submit"
            >
              <ComputerIcon />
            </Button>
          </Tooltip>
        </GridContainer>
      </form>
    </>
  );
};

export default CreateDevice;
