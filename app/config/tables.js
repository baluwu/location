/**
 * 点三ERP-数据库分库分表策略
 * @authors AndyLau (i@windyland.com)
 * @date    2016-03-23 16:45:42
 * @version V1.0.1
 */
"use strict";

let tables = {
    e_after_base: {
        n: 100
    },
    e_after_delivery_in: {
        n: 100
    },
    e_after_delivery_out: {
        n: 100
    },
    e_after_goods_in: {
        n: 100
    },
    e_after_goods_out: {
        n: 100
    },
    e_after_log: {
        n: 100
    },
    e_after_message: {
        n: 100
    },
    e_after_reason: {
        n: 100
    },
    e_after_refuse: {
        n: 100
    },
    e_after_return: {
        n: 100
    },
    e_after_settling: {
        n: 100
    },
    e_alipay_account: {
        n: 10000
    },
    e_asset_account: {
        n: 1
    },
    e_assets: {
        n: 1
    },
    e_business_account: {
        n: 1
    },
    e_business_account_name: {
        n: 1
    },
    e_business_account_op_log: {
        n: 1
    },
    e_business_account_type: {
        n: 1
    },
    e_business_bill: {
        n: 100
    },
    e_business_call_buy_log: {
        n: 10
    },
    e_business_cloopcall_log: {
        n: 100
    },
    e_business_columns: {
        n: 1
    },
    e_business_custom: {
        n: 1
    },
    e_business_custom_detial: {
        n: 1
    },
    e_business_deduction_log: {
        n: 10
    },
    e_business_delivery: {
        n: 1
    },
    e_business_delivery_area: {
        n: 100
    },
    e_business_delivery_item: {
        n: 100
    },
    e_business_delivery_outlets: {
        n: 1
    },
    e_business_goods_tmp: {
        n: 1
    },
    e_business_marketing: {
        n: 100
    },
    e_business_marketing_log: {
        n: 100
    },
    e_business_msg_buy_log: {
        n: 100
    },
    e_business_post_fee: {
        n: 100
    },
    e_business_print_tpl: {
        n: 1
    },
    e_business_print_tpl_custom_fields: {
        n: 1
    },
    e_business_printer: {
        n: 1
    },
    e_business_role: {
        n: 1
    },
    e_business_saling_remember: {
        n: 1
    },
    e_business_saling_remember_log: {
        n: 100
    },
    e_business_sku_tmp: {
        n: 1
    },
    e_business_supplier: {
        n: 10
    },
    e_cargo_goods: {
        n: 1000
    },
    e_cargo_goods_log: {
        n: 100
    },
    e_cargo_goods_log_detial: {
        n: 100
    },
    e_cargo_goods_op_log: {
        n: 1000
    },
    e_cargo_goods_temp: {
        n: 1
    },
    e_change_goods_record: {
        n: 100
    },
    e_costprice_temp: {
        n: 1
    },
    e_financial_cat: {
        n: 1
    },
    e_financial_selectuse: {
        n: 1
    },
    e_financial_sourcesreceipt: {
        n: 1
    },
    e_goods: {
        n: 1000
    },
    e_goods_attribute: {
        n: 100
    },
    e_goods_brand: {
        n: 10
    },
    e_goods_cat: {
        n: 1
    },
    e_goods_cost_op_log: {
        n: 100
    },
    e_goods_custom: {
        n: 1
    },
    e_goods_market_gift: {
        n: 100
    },
    e_goods_market_rule: {
        n: 100
    },
    e_goods_matchlog: {
        n: 100
    },
    e_goods_platform: {
        n: 1000
    },
    e_goods_skus: {
        n: 1000
    },
    e_goods_suit: {
        n: 100
    },
    e_hot_goods_count: {
        n: 1
    },
    e_in_out_account: {
        n: 1
    },
    e_income_expend: {
        n: 100
    },
    e_inventory_log: {
        n: 10
    },
    e_logistics_info: {
        n: 10000
    },
    e_member_custom: {
        n: 1
    },
    e_member_group: {
        n: 100
    },
    e_members: {
        n: 10000
    },
    e_month_asset_survey: {
        n: 1
    },
    e_month_manage_survey: {
        n: 1
    },
    e_orders: {
        n: 10000
    },
    e_orders_breakup: {
        n: 10
    },
    e_orders_log: {
        n: 100
    },
    e_orders_operate: {
        n: 100
    },
    e_purchase: {
        n: 100
    },
    e_purchase_items: {
        n: 100
    },
    e_purchase_items_tmp: {
        n: 1
    },
    e_purchase_log: {
        n: 100
    },
    e_purchase_mark: {
        n: 100
    },
    e_purchase_operation_log: {
        n: 100
    },
    e_purchase_prepay: {
        n: 10
    },
    e_purchase_return: {
        n: 100
    },
    e_reason: {
        n: 1
    },
    e_return_goods_count: {
        n: 1
    },
    e_sale_abnormal: {
        n: 10
    },
    e_sale_after_goods: {
        n: 10
    },
    e_sale_after_log: {
        n: 10
    },
    e_sale_trade_count: {
        n: 1
    },
    e_sale_user_count: {
        n: 1
    },
    e_score: {
        n: 1
    },
    e_send_speed_count: {
        n: 1
    },
    e_shipping: {
        n: 10000
    },
    e_stocktransfer_temp: {
        n: 1
    },
    e_storage_cargo: {
        n: 10
    },
    e_storage_place: {
        n: 1
    },
    e_storage_shelf: {
        n: 10
    },
    e_store_cat: {
        n: 10
    },
    e_trade: {
        n: 10000
    },
    e_trade_after_purchase_count: {
        n: 1
    },
    e_trade_comm_follow: {
        n: 1
    },
    e_trade_comment: {
        n: 1
    },
    e_unsalable_goods_count: {
        n: 1
    },
    e_waybill_update: {
        n: 1
    },
    e_goods_sale_count: {
        n: 100
    },
    e_goods_stock_count: {
        n: 100
    },
    e_day_sale_trade: {
        n: 1
    },
    e_month_sale_trade: {
        n: 1
    },
    e_day_after_count: {
        n: 1
    },
    e_month_after_store: {
        n: 1
    },
    e_goods_after_count: {
        n: 1
    },
    e_after_reason_count: {
        n: 1
    },
    e_day_send_delivery_count: {
        n: 1
    },
    e_month_post_check_count: {
        n: 1
    },
    e_send_time_count: {
        n: 1
    },
    e_user_area_count: {
        n: 10
    }
}

let util = global.util,
    pris = util.require.config('database').private;//Inherit the function : get private group name

let m = {
	mainDatabaseId:'default',//主库配置组名
	//获取分库的配置组名
	getDatabaseGroupId:function(bid){
        if(!bid || !parseInt(bid)) return m.mainDatabaseId;
		if(!!pris(bid)) return pris(bid);//私云数据库组
        return 'other' + (parseInt(bid) % 10);
	},
	getTableName:function(t,bid){
        t = t.replace(/\_\d+$/,'');
		let op = tables[t];
		if(!op) return t;//主库表不分
        if(!!pris(bid)) return t;//私云版不分
		switch(op.n){
			case 1://只分库，未分表
				break;
			case 10://分10张表
				t += '_' + (Math.floor(bid / 10) % 10);
				break;
			case 100://分100张表
				t += '_' + (Math.floor(bid / 10) % 100);
				break;
			case 1000://分1000张表
				//新增扩表，从商家id  2300开始分
				t += '_' + (Math.floor(bid / 10) % (bid>2300?1000:100));
				break;
			case 10000:
				let _i = bid>2300? 10000 : (t == 'e_members'?1000:100);
				t += '_' + (Math.floor(bid / 10) % _i);
				break;
		}
		return t;
	},
	fetchTable:function(t,bid){
        t = t.replace(/\_\d+$/,'');
		let op = tables[t];
		if(!op){
			//返回主库
			return {
					e:!1,//未分库，属于主库
					t:t,
					d:m.mainDatabaseId
				}
		}else{
			return {
					e:!0,//有分库
					d:m.getDatabaseGroupId(bid),
					t:m.getTableName(t,bid)
				}
            
		}
	},
	fetchSql:function(sql,bid){
		let g = null,
			tablePattern = /{{([\w\_]+)}}/ig;
		sql = sql.replace(tablePattern,function(){
			let f = m.fetchTable(arguments['1'],bid);
			if(!g){
				g = f.d;
			}
			return f.t;
		});
		return {sql:sql,dbg:g||m.mainDatabaseId};
	}

}

module.exports = m;