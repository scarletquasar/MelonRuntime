import { _MySqlClient } from "./constructors/_MySqlClient";
import { _PgClient } from "./constructors/_PgClient";
import { _SqlServerClient } from "./constructors/_SqlServerClient";
import { _clone } from "./_clone";
import { _compare } from "./_compare";
declare const _data: {
    clone: typeof _clone;
    compare: typeof _compare;
    PgClient: typeof _PgClient;
    MySqlClient: typeof _MySqlClient;
    SqlServerClient: typeof _SqlServerClient;
};
export { _data };
