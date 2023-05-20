import { RowDataPacket } from "mysql2"
import { withSql } from "../../utils/sql"

export namespace PriceQueries {

    interface IPrice extends RowDataPacket {
        value: number
    }

    export const getPrice = async () => withSql(async (sql) => {
        const [price] = await sql.execute<IPrice[]>("SELECT value FROM PRICE")
        return price[0].value
    })
}
