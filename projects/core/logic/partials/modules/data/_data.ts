import { _MySqlClient } from "./constructors/_MySqlClient";
import { _PgClient } from "./constructors/_PgClient";
import { _PgDocumentClient } from "./constructors/_PgDocumentClient";
import { _SqlServerClient } from "./constructors/_SqlServerClient";
import { _clone } from "./_clone";
import { _compare } from "./_compare";

const _data = {
    clone: _clone,
    compare: _compare,
    PgClient: _PgClient,
    MySqlClient: _MySqlClient,
    SqlServerClient: _SqlServerClient,
    PgDocumentClient: _PgDocumentClient
}

export { _data }