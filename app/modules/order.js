const db = require("../models");
const { QueryTypes, condition  } = require("sequelize");
const Op = db.Sequelize.Op;
exports.getOrderTableData = async (pagination={}) => {
    var body={};
    var query="SELECT a.*,b.user_name,a.date_of_submission as date FROM application_order a left join application_user b on a.user_id=b.id ";
    pagination.total_count=await db.application_order.count(query);
    query+=" order by date_of_submission";
    query+=" limit "+((pagination.page-1)*pagination.page_size)+','+pagination.page_size;
    pagination.pages=Math.ceil(pagination.total_count/pagination.page_size);    
    let orders=await db.sequelize.query(query,{type: QueryTypes.SELECT});
    body={pagination:pagination,data:orders};
    return body;
};
