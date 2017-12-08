function baseweatherunderground(widget_id, url, skin, parameters)
{
    // Will be using "self" throughout for the various flavors of "this"
    // so for consistency ...

    self = this;

    self.weather_icons =
    {
      
      "chanceflurries": '&#xe015',
      "nt_chanceflurries": '&#xe015',
      "flurries": '&#xe015',
      "nt_flurries": '&#xe015',
      
      "chancerain": '&#xe009',
      "nt_chancerain": '&#xe009',
      "rain": '&#xe009',
      "nt_rain": '&#xe009',
      
      "chancesleet": '&#xe003',
      "nt_chancesleet": '&#xe003',
      "sleet": '&#xe003',
      "nt_sleet": '&#xe003',
      
      "chancesnow": '&#xe036',
      "nt_chancesnow": '&#xe036',
      "snow": '&#xe036',
      "nt_snow": '&#xe036',
      
      "chancetstorms": '&#xe025',
      "nt_chancetstorms": '&#xe025',
      "tstorms": '&#xe025',
      "nt_tstorms": '&#xe025',
      
      "clear": '&#xe028',
      "nt_clear": '&#xe02d',
      
      "cloudy": '&#xe000',
      "nt_cloudy": '&#xe000',
      
      "fog": '&#xe01b',
      "nt_fog": '&#xe01b',
      
      "hazy": '&#xe01e',
      "nt_hazy": '&#xe01e',
      
      "mostlycloudy": '&#xe001',
      "nt_mostlycloudy": '&#xe002',
      
      "mostlysunny": '&#xe001',
      "nt_mostlysunny": '&#xe002',
      
      "partlycloudy": '&#xe001',
      "nt_partlycloudy": '&#xe002',
      
      "partlysunny": '&#xe001',
      "nt_partlysunny": '&#xe002',
      
      "sunny": '&#xe028',
      "nt_sunny": '&#xe02d'
       
    };

    // Initialization

    self.widget_id = widget_id;

    // Store on brightness or fallback to a default

    // Parameters may come in useful later on

    self.parameters = parameters;

    var callbacks = [];

    // Define callbacks for entities - this model allows a widget to monitor multiple entities if needed
    // Initial will be called when the dashboard loads and state has been gathered for the entity
    // Update will be called every time an update occurs for that entity

    self.OnStateAvailable = OnStateAvailable;
    self.OnStateUpdate = OnStateUpdate;

    var monitored_entities =
    [
        {"entity": "sensor.pws_temp_f", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_relative_humidity", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_precip_1d", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_precip_2d", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_weather", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_weather_2d", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_temp_high_1d_f", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_temp_high_2d_f", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_temp_low_1d_f", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
        {"entity": "sensor.pws_temp_low_2d_f", "initial": self.OnStateAvailable, "update": self.OnStateUpdate},
    ];

    // Finally, call the parent constructor to get things moving

    WidgetBase.call(self, widget_id, url, skin, parameters, monitored_entities, callbacks);

    // Function Definitions

    // The StateAvailable function will be called when
    // self.state[<entity>] has valid information for the requested entity
    // state is the initial state
    // Methods

    function OnStateUpdate(self, state)
    {
        set_view(self, state)
    }

    function OnStateAvailable(self, state)
    {
      
        if (state.entity_id == "sensor.pws_temp_f")
        {
            self.set_field(self, "unit", state.attributes.unit_of_measurement)
        }
        set_view(self, state)
    }

    function set_view(self, state)
    {
        if (state.entity_id == "sensor.pws_weather")
        {
          
            var icon = state.attributes.entity_picture.split('/').pop().split('.')[0];
            
            self.set_field(self, "pws_weather", self.weather_icons[icon])
        }
        else if (state.entity_id == "sensor.pws_weather_2d")
        {
          
            var icon = state.attributes.entity_picture.split('/').pop().split('.')[0];
            
            self.set_field(self, "pws_weather_2d", self.weather_icons[icon])
        }
        else if (state.entity_id == "sensor.pws_temp_f")
        {
          
            self.set_field(self, "pws_temp_f", Math.round(state.state))
        }
        else
        {
            var field = state.entity_id.split(".")[1];
            self.set_field(self, field, state.state)
        }
    }
}
