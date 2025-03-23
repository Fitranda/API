module.exports = {
    "/api/peran": {
        "get": {
            "tags": ["Peran"],
            "summary": "Mengambil semua data peran",
            "description": "Endpoint ini digunakan untuk mendapatkan daftar semua peran yang tersedia.",
            "responses": {
                "200": {
                    "description": "Berhasil mendapatkan daftar peran"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                
            }
        },
        "post": {
            "tags": ["Peran"],
            "summary": "Menambahkan peran baru",
            "description": "Endpoint ini digunakan untuk menambahkan data peran baru ke dalam sistem.",
            "requestBody": {
                "content": {
                    "application/json": {
                        "example": {
                            "namaPeran": "Admin"
                        }
                    }
                }
            },
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "required": true,
                    "description": "Objek yang berisi data peran baru yang akan ditambahkan.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "namaPeran": {
                                "type": "string",
                                "description": "Nama dari peran yang akan ditambahkan."
                            }
                        },
                        "required": ["namaPeran"]
                    }
                }
            ],
            "responses": {
                "201": {
                    "description": "Peran berhasil ditambahkan"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "Nama peran diperlukan"
                }
            }
        }
    },
    "/api/peran/{id}": {
        "put": {
            "tags": ["Peran"],
            "summary": "Memperbarui data peran",
            "description": "Endpoint ini digunakan untuk memperbarui data peran yang sudah ada berdasarkan ID.",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "ID dari peran yang akan diperbarui.",
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "required": true,
                    "description": "Objek yang berisi data peran yang akan diperbarui.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "namaPeran": {
                                "type": "string",
                                "description": "Nama baru dari peran."
                            }
                        },
                        "required": ["namaPeran"]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Peran berhasil diperbarui"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "ID dan nama peran diperlukan"
                }
            }
        },
        "delete": {
            "tags": ["Peran"],
            "summary": "Menghapus data peran",
            "description": "Endpoint ini digunakan untuk menghapus data peran berdasarkan ID.",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "ID dari peran yang akan dihapus.",
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Peran berhasil dihapus"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "ID diperlukan"
                }
            }
        }
    }
};
  