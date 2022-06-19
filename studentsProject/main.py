from flask import Flask, render_template, jsonify, request
import pymysql

app = Flask(__name__)
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='web_test', charset="utf8")
cursor = db.cursor()

@app.route("/page", methods=["GET"])
def start():
	return render_template('index.html')

@app.route("/student", methods=["GET"])
def get_students():
    sql = "select * from student_score"
    cursor.execute(sql)
    results = cursor.fetchall()
    db.commit()
    student_score = []
    for result in results:
        student_score.append({
            'name': result[1],
            'korean': result[2],
            'math': result[3],
            'english': result[4]
        })
    return jsonify(student_score)

@app.route("/student", methods=["POST"])
def save_student():
    server_name = request.form["name"]
    server_korean = request.form["korean"]
    server_math = request.form["math"]
    server_english = request.form["english"]
    sql = "insert into student_score (name, korean, math, english) values ('%s',%s,%s,%s)" %(server_name, server_korean, server_math, server_english)
    cursor.execute(sql)
    db.commit()
    return "save OK"

@app.route("/student", methods=["DELETE"])
def del_student():
    server_name = request.args.get("name")
    sql = "delete from student_score where name='%s'" % server_name
    cursor.execute(sql)
    db.commit()
    return "del OK"

@app.route("/student", methods=["PUT"])
def retouch_student():
    server_name = request.form["name"]
    server_korean = request.form["korean"]
    server_math = request.form["math"]
    server_english = request.form["english"]
    sql = "update student_score set korean=%s, math=%s, english=%s where name='%s'" % (server_korean, server_math, server_english, server_name)
    cursor.execute(sql)
    db.commit()
    return "retouch OK"

@app.route("/student/sortk", methods=["GET"])
def sort_korean():
    sql = "select * from student_score order by korean desc"
    cursor.execute(sql)
    results = cursor.fetchall()
    db.commit()
    student_score = []
    for result in results:
        student_score.append({
            'name': result[1],
            'korean': result[2],
            'math': result[3],
            'english': result[4]
        })
    return jsonify(student_score)


@app.route("/student/sortm", methods=["GET"])
def sort_math():
    sql = "select * from student_score order by math desc"
    cursor.execute(sql)
    results = cursor.fetchall()
    db.commit()
    student_score = []
    for result in results:
        student_score.append({
            'name': result[1],
            'korean': result[2],
            'math': result[3],
            'english': result[4]
        })
    return jsonify(student_score)

@app.route("/student/sorte", methods=["GET"])
def sort_english():
    sql = "select * from student_score order by english desc"
    cursor.execute(sql)
    results = cursor.fetchall()
    db.commit()
    student_score = []
    for result in results:
        student_score.append({
            'name': result[1],
            'korean': result[2],
            'math': result[3],
            'english': result[4]
        })
    return jsonify(student_score)


if __name__ == "__main__":
    app.run(debug=True)