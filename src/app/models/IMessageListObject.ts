export interface IMessageListObject {
    _id: string;
    planner: string;
    vendor: string;
    recentMessage: {[index: string]: string};
    vendors: {[index: string]: string};
    planners: {[index: string]: string};
    unreadCount: number;
}

export interface IRecentMessageData {
    message: string;
    createdAt: string;
    thread: string;
    type: string;
    image: {[index: string]: string};
}
