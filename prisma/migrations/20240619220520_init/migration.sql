-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" TEXT,
    "success" BOOLEAN NOT NULL,
    "message" TEXT,
    "errors" TEXT,
    "data" TEXT
);
INSERT INTO "new_ApiResponse" ("data", "errors", "id", "message", "success", "timestamp") SELECT "data", "errors", "id", "message", "success", "timestamp" FROM "ApiResponse";
DROP TABLE "ApiResponse";
ALTER TABLE "new_ApiResponse" RENAME TO "ApiResponse";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
