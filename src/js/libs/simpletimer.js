/* @charset "UTF-8" */
/*
 * @author 山超<shanchao@myhexin.com>
 * @create 2016-12-12
 */
(function ($) {
	//默认参数
	var defaluts = {
		day: 0,				// 日
		dayDom: '',			// 日选择器
		hour: 0,			// 小时
		hourDom: '',		// 小时选择器
		minute: 1,			// 分钟
		minuteDom: '',		// 分钟选择器
		second: 0,			// 秒
		secondDom: '',		// 秒选择器
		millisecond: 0,		// 毫秒
		millisecondDom: '',	// 毫秒选择器
		blank: 1000, 		// 刷新间距
		pause: '',			// 暂停按钮选择器
		pauseFun: '',		// 暂停回调方法
		goonFun: '',		// 继续回调方法
		endFun: '',			// 结束回调方法
		animation: 'none' 	// 无动画效果  有时间再加
	};

	$.fn.extend({
		stamp: 0,				// 倒数时间（单位 百毫秒）
		intervalObj: {},		// 计时器对象
		state: 1,				// 1.计时 0.暂停
		simpletimer: function (options) {
			var _self = this;
			var options = $.extend({}, defaluts, options);

			_self.stamp = parseInt(options.millisecond) + 
						  10 * parseInt(options.second) + 
						  600 * parseInt(options.minute) + 
						  36000 * parseInt(options.hour) +
						  864000 * parseInt(options.day);
			this._dida(options);
			this._pause(options);
		},
		_pause: function (options) {
			var _self = this;

			$(options.pause).on('click', function () {
				console.log(2);
				if (_self.state === 1) {
					_self.state = 0;
					clearInterval(_self.intervalObj);
					$(this).html('Resume');
					options.pauseFun();
				} else {
					_self.state = 1;
					_self._dida(options);
					options.goonFun();
				}
			});
		},
		_dida: function (options) {
			var _self = this;
			_self.intervalObj = setInterval(function () {
				var temp = _self.stamp;
				var day = Math.floor(temp / 864000);
				temp = temp % 864000;
				var hour = Math.floor(temp / 36000);
				temp = temp % 36000;
				var minute = Math.floor(temp / 600);
				temp = temp % 600;
				var second = Math.floor(temp / 10);
				var millisecond = temp % 10; 
				$(options.dayDom).html(_self.prefixInteger(day, 2));
				$(options.hourDom).html(_self.prefixInteger(hour, 2));
				$(options.minuteDom).html(_self.prefixInteger(minute, 2));
				$(options.secondDom).html(_self.prefixInteger(second, 2));
				$(options.millisecondDom).html(_self.prefixInteger(millisecond, 1));
				_self.stamp = _self.stamp - (options.blank/100).toFixed(0);
				if (_self.stamp < 0) {
					_self.state = 0;
					clearInterval(_self.intervalObj);
					options.endFun();
				}
			}, parseInt(options.blank));
		},
		prefixInteger: function(num, length) {  
			return ( "0000" + num ).substr( -length );  
		}
	});
	
})(jQuery);

