export * from "./identity/types";

import * as realIdentityApi from "./identity/api";
import * as mockIdentityApi from "./identity/mock-api";

const useLive = process.env.NEXT_PUBLIC_USE_LIVE_API === "true";

export const identityApi = useLive ? realIdentityApi : mockIdentityApi;

export * from "./shared/types";

export * from "./monitoring/types"
export * from "./monitoring/api"
export * from "./monitoring/mapper"

export * from "./billing/types"
export * from "./billing/api"
import * as mockBillingApi from "./billing/mock-api";
import * as realBillingApi from "./billing/api";

export const { getSubscription } = useLive ? realBillingApi : mockBillingApi;