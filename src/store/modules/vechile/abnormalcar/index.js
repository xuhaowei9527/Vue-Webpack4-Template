import CorrectVehicleType from "./correctvehicletype";
import RepetitionType from "./repetitiontype";
import ReadCardType from "./readcardtype";
import ContainerType from "./containertype";
import NoCardType from "./nocardtype";
import TrailerType from "./trailertype";
import OvertimeVehicle from "./overtimevehicle";
import UType from "./utype";
import FalseEvidenceType from "./falseevidencetype";

const tabs = {
  namespaced: true,
  state: {
    componentsname: "CorrectVehicleType"
  },
  // 嵌套模块
  modules: {
    CorrectVehicleType: CorrectVehicleType.CorrectVehicleType,
    RepetitionType: RepetitionType.RepetitionType,
    ReadCardType: ReadCardType.ReadCardType,
    ContainerType: ContainerType.ContainerType,
    NoCardType: NoCardType.NoCardType,
    TrailerType: TrailerType.TrailerType,
    OvertimeVehicle: OvertimeVehicle.OvertimeVehicle,
    UType: UType.UType,
    FalseEvidenceType: FalseEvidenceType.FalseEvidenceType
  }
};
export default {
  tabs
};
