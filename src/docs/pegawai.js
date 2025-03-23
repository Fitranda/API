module.exports = {
    "/api/pegawai": {
        "get": {
            "tags": ["Pegawai"],
            "summary": "Mengambil semua data pegawai",
            "description": "Endpoint ini digunakan untuk mendapatkan data pegawai yang tersedia.",
            "responses": {
                "200": {
                    "description": "Berhasil mendapatkan data pegawai"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                
            }
        },
        "post": {
            "tags": ["Pegawai"],
            "summary": "Menambahkan pegawai baru",
            "description": "Endpoint ini digunakan untuk menambahkan data pegawai baru ke dalam sistem.",
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "required": true,
                    "description": "Objek yang berisi data pegawai baru yang akan ditambahkan.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "namaPegawai": {
                                "type": "string",
                                "description": "Nama dari pegawai yang akan ditambahkan."
                            },
                            "alamat": {
                                "type": "string",
                                "description": "Alamat dari pegawai yang akan ditambahkan."
                            },
                            "kontak": {
                                "type": "string",
                                "description": "Kontak dari pegawai yang akan ditambahkan."
                            },
                            "username": {
                                "type": "string",
                                "description": "Username dari pegawai yang akan ditambahkan."
                            },
                            "password": {
                                "type": "string",
                                "description": "Password dari pegawai yang akan ditambahkan."
                            },
                            "idPeran": {
                                "type": "string",
                                "description": "idPeran dari pegawai yang akan ditambahkan."
                            },

                        },
                        "required": ["namaPeran","username","password","idPeran"]
                    }
                }
            ],
            "responses": {
                "201": {
                    "description": "Pegawai berhasil ditambahkan"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "Ada Validasi yang tidak sesuai"
                }
            }
        }
    },
    "/api/pegawai/{id}": {
        "put": {
            "tags": ["Pegawai"],
            "summary": "Memperbarui data pegawai",
            "description": "Endpoint ini digunakan untuk memperbarui data pegawai yang sudah ada berdasarkan ID.",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "ID dari pegawai yang akan diperbarui.",
                    "schema": {
                        "type": "integer"
                    }
                },
                {
                    "in": "body",
                    "name": "body",
                    "required": true,
                    "description": "Objek yang berisi data pegawai yang akan diperbarui.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "namaPegawai": {
                                "type": "string",
                                "description": "Nama dari pegawai yang akan ditambahkan."
                            },
                            "alamat": {
                                "type": "string",
                                "description": "Alamat dari pegawai yang akan ditambahkan."
                            },
                            "kontak": {
                                "type": "string",
                                "description": "Kontak dari pegawai yang akan ditambahkan."
                            },
                            "username": {
                                "type": "string",
                                "description": "Username dari pegawai yang akan ditambahkan."
                            },
                            "password": {
                                "type": "string",
                                "description": "Password dari pegawai yang akan ditambahkan."
                            },
                            "idPeran": {
                                "type": "string",
                                "description": "idPeran dari pegawai yang akan ditambahkan."
                            },

                        },
                        "required": ["namaPeran","username","idPeran"]
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "Pegawai berhasil diperbarui"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "Ada validasi yang salah"
                }
            }
        },
        "delete": {
            "tags": ["Pegawai"],
            "summary": "Menghapus data pegawai",
            "description": "Endpoint ini digunakan untuk menghapus data pegawai berdasarkan ID.",
            "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "ID dari pegawai yang akan dihapus.",
                    "schema": {
                        "type": "integer"
                    }
                }
            ],
            "responses": {
                "200": {
                    "description": "pegawai berhasil dihapus"
                },
                "500": {
                    "description": "Terjadi kesalahan pada server"
                },
                "400": {
                    "description": "Ada validasi yang salah"
                }
            }
        }
    }
};
  