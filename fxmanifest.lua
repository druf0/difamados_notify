fx_version 'adamant'
game 'gta5'

author 'amaromorte'
description 'Notification system for Difamados RP'
version '1.0'

client_scripts {
	'client/main.lua'
}

ui_page "html/index.html"

files({
    'html/**.**',
    'html/assets/**',
    'html/scripts/**.**'
})

export "notify"

--[[

 exports["difamados_notify"]:notify('Titulo', 'Texto de la notificación!', 'difamados') 

 ]]--