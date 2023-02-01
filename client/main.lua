local settingsOpen = false

CreateThread(function()
  TriggerEvent('chat:addSuggestion', '/notif', 'Ajustes de las notificaciones')
end)

RegisterNetEvent("difnot:notify")
AddEventHandler("difnot:notify", function(title, text, type, duration)
  notify(title, text, type)
end)

notify = function(title, text, type, duration)
  SendNUIMessage({
    action = "notify",
    data = {
      title = title,
      text = text,
      type = type,
      duration = duration
    }
  })
end

RegisterCommand('notif', function()
  if settingsOpen then
    closeSettings() 
  else
    settingsOpen = true
    SendNUIMessage({
      action = "settings"
    })
    SetNuiFocus(true, true)
  end
end)

closeSettings = function()
  settingsOpen = false
  SendNUIMessage({
    action = "closeSettings"
  })
  SetNuiFocus(false, false)
end


RegisterNUICallback("action", function(data, cb)
	if data.action == "close" then
		closeSettings()
  end
end)

RegisterCommand('prueba', function()
  notify('Difamados RP', 'Este es un mensaje de prueba', 'difamados')
end)