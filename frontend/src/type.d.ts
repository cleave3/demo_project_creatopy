interface IItem {
    id: number
    title: string
    creator: { name: string }
}

type ItemState = {
    submitting: boolean,
    removing: boolean,
    loading: boolean
    items: IItem[]
}

type ItemAction = {
    type: string
    payload: IItem
}

type UserState = {
    loading: boolean
    auth: boolean
    name: string
    token: string
    message: string
}

type AppState = {
    user: UserState
    items: ItemState
}

type DispatchType = (args: ItemAction) => ItemAction