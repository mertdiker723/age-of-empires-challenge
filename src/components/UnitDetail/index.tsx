import { ReactNode } from 'react'


// Styles
import "./Style.scss"

type UnitDetailTableProps = {
    renderUnits: [string, any][] | undefined;
}
const UnitDetailTable = ({ renderUnits }: UnitDetailTableProps) => {
    return (
        <div className='table-container'>
            {
                renderUnits && renderUnits.map(([key, value], index) => {
                    const title = key.split('').map((char, index) => (index === 0 ? char.toUpperCase() : char.replace(/_/g, ' '))).join('');

                    return value !== null && typeof value === 'object' ? Object.entries(value).map(([costKey, costValue], indexNested) => {
                        return (
                            <div className='table-container_header' key={indexNested}>
                                {costKey} {title}:
                                <span className='text-item'>{costValue as ReactNode}</span>
                            </div>
                        )
                    })
                        : (
                            <div className='table-container_header' key={index}>
                                {title}:
                                <span className='text-item'>{value}</span>
                            </div>
                        )
                })
            }

        </div>
    )
}

export default UnitDetailTable