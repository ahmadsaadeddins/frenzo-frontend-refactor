import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { authAxios } from "../services";
import { api } from "../api.js";

export const devicesAdapter = createEntityAdapter({});

export const createNewDevice = createAsyncThunk(
  "devices/createNewDeviceStatus",
  async (device) => {
    const formData = new FormData();
    formData.append("name", device.name);
    formData.append("number", device.number);
    formData.append("cpu", device.cpu);
    formData.append("ram", device.ram);
    formData.append("vga", device.vga);
    formData.append("hdd", device.hdd);
    formData.append("monitor", device.monitor);
    const response = await authAxios.post(api.devices.create, formData);
    return response.data;
  }
);
export const fetchAllDevices = createAsyncThunk(
  "devices/fetchAllDevicesStatus",
  async () => {
    const response = await authAxios.get(api.devices.list);
    return response.data;
  }
);

export const devicesSlice = createSlice({
  name: "devices",
  initialState: devicesAdapter.getInitialState({
    loading: false,
    error: "",
    device: {},
  }),
  reducers: {
    deviceAdded: devicesAdapter.addOne,
    devicesLoading(state) {
      if (state.loading === false) {
        state.loading = true;
      }
    },
    devicesReceived(state, action) {
      if (state.loading === true) {
        devicesAdapter.setAll(state, action.payload);
        state.loading = false;
      }
    },
    deviceUpdated: devicesAdapter.updateOne,
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorInput: (state, action) => {
      state.error[action.payload[0]] = action.payload[1];
    },
    setDevice: (state, action) => {
      state.device[action.payload[0]] = action.payload[1];
    },
    resetDevice: (state) => {
      state.device = {};
    },
  },
  extraReducers: {
    [createNewDevice.pending]: (state) => {
      state.loading = true;
    },
    [createNewDevice.fulfilled]: (state) => {
      state.loading = false;
    },
    [createNewDevice.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const {
  devicesLoading,
  devicesReceived,
  deviceAdded,
  deviceUpdated,
  setDevice,
  setLoading,
  setError,
  resetDevice,
  setErrorInput,
} = devicesSlice.actions;

export default devicesSlice.reducer;
