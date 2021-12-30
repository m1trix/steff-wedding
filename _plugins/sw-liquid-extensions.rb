$counter = 0

module Jekyll
  module LiquidFilters
    def sw_events_to_carousel_items(events)
      return events.map do |event|
        {
          'text' => event['sw-event-name'],
          'image' => "events/#{event['sw-event-id']}-1"
        }
      end
    end

    def sw_id(*_)
      return $counter += 1
    end
  end
end

Liquid::Template.register_filter(Jekyll::LiquidFilters)