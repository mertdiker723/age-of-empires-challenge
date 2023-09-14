// Components
import Ages from "../../components/Unit/Ages"
import Costs from "../../components/Unit/Costs"
import UnitTable from "../../components/Unit/UnitTable"
import { UnitEditContextProvider } from "./unitContext"

const Unit = () => {
    return (
        <UnitEditContextProvider>
            <Ages />
            <Costs />
            <UnitTable />
        </UnitEditContextProvider>
    )
}

export default Unit