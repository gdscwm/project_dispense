interface FlowResult {
    status: number;
    message: string | null;
    body: Patron | null;
}

/**
 * The body of the response from the flow endpoint
 */
type Patron = {
    email: string;
    firstName: string;
    lastName: string;
    availablePoints: number;
    userType: string;
}