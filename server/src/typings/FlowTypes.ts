interface FlowResult {
    status: number;
    message: string | null;
    body: UserRecord | null;
}

/**
 * The body of the response from the flow endpoint
 */
type UserRecord = {
    email: string;
    firstName: string;
    lastName: string;
    availablePoints: number;
    userType: string;
}