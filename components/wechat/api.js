Picker.route('/api/wechat', function(params, req, res, next) {

    var token = framework.wechat.token();



    if (params && params.query && params.query.echostr) {

        console.log("echostr:" + params.query.echostr);

        res.end(params.query.echostr);

    } else if (params && params.query) {


        var openid = params.query.openid;

        if (params.query.openid) {

            var body = "";

            req.on('data', Meteor.bindEnvironment(function(data) {

                body += data;

            }));

            req.on('end', Meteor.bindEnvironment(function() {

                var md5k = CryptoJS.MD5(body).toString();

                if (wxMessages.findOne({ key: md5k })) {
                    console.log("repeat");
                    res.end("success");
                    return true;
                }

                wxMessages.insert({
                    key: md5k,
                    createdAt: new Date(),
                });
                // console.log(body);
                xml2js.parseString(body, function(err, result) {
                    var fm = {};
                    // console.log(result);
                    if (result.xml) {
                        for (var key in result.xml) {
                            fm[key] = (result.xml[key][0]) ? result.xml[key][0] : result.xml[key];
                        }
                    }
                    
                    var ans = framework.wechat.service(openid, fm);
                   
                    if (ans) {
                        console.log(ans);
                        var xml = `<xml><ToUserName><![CDATA[` + openid + `]]></ToUserName><FromUserName><![CDATA[` + framework.wechat.developer + `]]></FromUserName>
                            <CreateTime>` + (new Date().getTime()) + `</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[` + ans + `]]></Content></xml>`;
                        console.log(xml);
                        res.end(xml);

                    } else if (fm.MsgType == "text") {
                        console.log(fm.MsgType);
                        //问答事件
                        var ai_ans = _robot.ask(openid, fm.Content);
                         console.log(ai_ans);
                        var xml = `<xml><ToUserName><![CDATA[` + openid + `]]></ToUserName><FromUserName><![CDATA[` + framework.wechat.developer + `]]></FromUserName>
                            <CreateTime>` + (new Date().getTime()) + `</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[` + ai_ans + `]]></Content></xml>`;
                        console.log(xml);
                        res.end(xml);
                    } else if ((fm.MsgType == "event") && (fm.Event == "CLICK")) {
                        console.log(fm.Event);
                        //菜单点击事件
                        var ai_ans = _robot.ask(openid, fm.EventKey);
                        var wm = WxMenu.findOne({ type: "text", link: fm.EventKey });
                        if (wm) {
                            WxMenu.update({ _id: wm._id }, { $inc: { click: 1 } })
                        }
                        var xml = `<xml><ToUserName><![CDATA[` + openid + `]]></ToUserName><FromUserName><![CDATA[` + framework.wechat.developer + `]]></FromUserName>
                            <CreateTime>` + (new Date().getTime()) + `</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[` + ai_ans + `]]></Content></xml>`;
                        console.log(xml);   
                        res.end(xml);
                    } else if ((fm.MsgType == "event") && (fm.Event == "VIEW")) {
                        console.log(fm.Event);
                        //菜单浏览事件
                        var wm = WxMenu.findOne({ type: "text", link: fm.EventKey });
                        if (wm) {
                            WxMenu.update({ _id: wm._id }, { $inc: { click: 1 } })
                        }
                        console.log("success");   
                        res.end("success");

                    } else {

                        console.log("success");
                        res.end("success");
                    }
                });

                res.writeHead(200);



            }));

        } else {
            console.log("UNKNOW REQUEST2");
            res.end("UNKNOW REQUEST2");
        }




        // res.end();

    } else {
        console.log("UNKNOW REQUEST");
        res.end("UNKNOW REQUEST");
    }

});
