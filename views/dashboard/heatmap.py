from .. import SmartView
from pyramid.view import view_config
import re
from fusion import tools


class Heatmap(SmartView):
    DesktopTemplate = "dashboard/heatmap.mak"

    @view_config(route_name="heatmap", request_method="GET")
    @view_config(route_name="heatmap", request_method="POST")
    def get_html(self):
        obj = self.get_heatmap_data()
        template = Heatmap.DesktopTemplate
        return self.render(obj, template=template)

    @view_config(route_name="map_widget", request_method="GET")
    @view_config(route_name="map_widget", request_method="POST")
    def get_widget(self):
        obj = self.get_heatmap_data()
        return self.emit_json(obj)

    def get_heatmap_data(self):
        #import heapq
        #self.hotlink_extract()
        member = self.ctx.member
        if member is None:
            raise NotAuthenticatedError()

        histogram = member.histogram()
        locations = histogram.locations

        # app_uri = tools.constants.APP_URI
        objects = []
        theCounts = []
        minBulletSize = 10
        maxBulletSize = 40

        #arr = [c['count'] for c in locations]
        #top_two = heapq.nlargest(2, arr)
        #if top_two[0] - top_two[1] > 500:
        #    max_val = top_two[1]
        #else:
        #    max_val = top_two[0]

        for location in locations:
            count = location["count"]
            label = location["label"]
            coord = location["pt"]
            id = location["id"]

            # url = "%s/search/location_id:%s" % (app_uri, str(id))
            url = "search/location_id:%s/%s" % (str(id), label)
            color = "#9d97d2"
            size = "small"
            title = "%s" % label
            #scaled_num = round(((float(count) / max_val) * maxBulletSize))
            #marker_size = scaled_num
            marker_size = count
            if count > 1:
                title = "%s | %s contacts" % (title, str(count))
                size = "large" if count > 10 else "medium"
                color = "#f00" if count > 10 else "#e16a02"
                if marker_size > 10000:
                    marker_size = 60
                elif marker_size < 10000 and marker_size > 1000:
                    marker_size = 50
                elif marker_size > 100 and marker_size <= 1000:
                    marker_size = 40
                elif marker_size > 50 and marker_size <= 100:
                    marker_size = 25
                elif marker_size > 20 and marker_size <= 50:
                    marker_size = 20
                else:
                    marker_size = count

            if marker_size < minBulletSize:
                marker_size = minBulletSize

            objects.append({
                "url": url,
                "title": title,
                "size": size,
                "color": color,
                "lat": coord["lat"],
                "lon": coord["lon"],
                "count": marker_size
            })
        #newCounts = self.normalize_data(minBulletSize, maxBulletSize, theCounts)
        container = {"points": objects}

        return container

    def normalize_data(self, minBullet, maxBullet, arr):
        import heapq
        new_count = []
        try:
            #high_low = sorted(arr)[::len(arr)-1]
            highVal = 5

            top_two = heapq.nlargest(2, arr)
            if top_two[0] - top_two[1] > 500:
                max_val = top_two[1]
            else:
                max_val = top_two[0]
            for i in arr:
                scaled_num = ((float(i) / max_val) * maxBullet)
                scaled_num = round(scaled_num)
                if scaled_num < minBullet:
                    new_count.append(minBullet)
                else:
                    new_count.append(scaled_num)
        except Exception, err:
            print(err)
        # print(new_count)
        return arr