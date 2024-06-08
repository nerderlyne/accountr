import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, StringColumn as StringColumn_, Index as Index_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class AccountDeployed {
    constructor(props?: Partial<AccountDeployed>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @StringColumn_({nullable: false})
    network!: string

    @Index_()
    @IntColumn_({nullable: false})
    block!: number

    @Index_()
    @StringColumn_({nullable: false})
    entryPoint!: string

    @Index_()
    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @Index_()
    @StringColumn_({nullable: false})
    userOpHash!: string

    @Index_()
    @StringColumn_({nullable: false})
    sender!: string

    @StringColumn_({nullable: false})
    factory!: string

    @StringColumn_({nullable: false})
    paymaster!: string

    @Index_()
    @StringColumn_({nullable: false})
    txHash!: string
}
